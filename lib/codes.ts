import { customAlphabet } from "nanoid";

// Unambiguous alphabet (no 0/O, 1/I/L) — this code is read aloud/typed manually
// at the gate as a fallback to scanning the QR.
const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 8);

/** Generates a short, unguessable, human-typeable registration code. */
export function generateUniqueCode(): string {
  return `ACRES-${nanoid()}`;
}
