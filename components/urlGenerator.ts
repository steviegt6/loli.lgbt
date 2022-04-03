import { readFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";

export const alphanumericRange =
  "abcdefghijklmnoqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export const zws = ["\u200B", "\u200C", "\u200D", "\u2060"];

function readFileTxt(...path: string[]): string[] {
  return readFileSync(join(process.cwd(), ...path))
    .toString()
    .split("\n");
}

export const animals = readFileTxt("public", "resources", "animals.txt");
export const adjectives = readFileTxt("public", "resources", "adjectives.txt");

function randomFromArray<T>(array: T[] | string): T | string {
  return array[Math.floor(Math.random() * array.length)];
}

function getArrayElements<T>(array:T[] | string, length: number): string {
    var result = "";

    for (var i = 0; i < length; i++)
        result += randomFromArray(array);

    return result;
}

export function getGfycatUrl(): string {
  return (
    randomFromArray(adjectives) +
    randomFromArray(adjectives) +
    randomFromArray(animals)
  );
}

export function getAlphanumeric() {
    return getArrayElements(alphanumericRange, 8);
}

export function getZws() {
    return getArrayElements(zws, 16);
}
