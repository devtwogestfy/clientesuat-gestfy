export function getGigaBytes(bytes) {
    let gb = bytes / 1024 / 1024 / 1024;
    return Math.round(gb * 10) / 10;
}
