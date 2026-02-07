import * as Tone from "tone";
import { Faker, en } from "@faker-js/faker";

let currentInstruments = [];
let currentParts = [];

const cleanup = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    currentParts.forEach(part => part.dispose());
    currentParts = [];
    currentInstruments.forEach(inst => inst.dispose());
    currentInstruments = [];
};

export const playSong = async (songId) => {
    await Tone.start();
    cleanup();
    const musicRand = new Faker({ locale: [en] });
    musicRand.seed(songId);
    const waveType = musicRand.helpers.arrayElement(["sine", "triangle", "sawtooth"]);
    const tempo = musicRand.number.int({ min: 80, max: 130 });
    Tone.Transport.bpm.value = tempo;

    const lead = new Tone.Synth({
        oscillator: { type: waveType },
        envelope: { attack: 0.1, release: 1 },
    }).toDestination();

    const bass = new Tone.MonoSynth({
        oscillator: { type: "square" },
        envelope: { attack: 0.1, release: 2 },
    }).toDestination();

    const reverb = new Tone.Reverb(1.5).toDestination();
    lead.connect(reverb);
    currentInstruments.push(lead, bass, reverb);
    const scale = ["A3", "C4", "D4", "E4", "G4", "A4", "C5"];
    const bassScale = ["A2", "E3"];

    const leadPart = new Tone.Part((time) => {
        const note = musicRand.helpers.arrayElement(scale);
        lead.triggerAttackRelease(note, "8n", time);
    }, Array.from({ length: 8 }, (_, i) => i * 0.5));

    const bassPart = new Tone.Part((time) => {
        const note = musicRand.helpers.arrayElement(bassScale);
        bass.triggerAttackRelease(note, "2n", time);
    }, [0, 2]);

    currentParts.push(leadPart, bassPart);
    leadPart.start(0);
    bassPart.start(0);
    Tone.Transport.start();
    Tone.Transport.stop("+4");
};
