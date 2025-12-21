export function deleteByPath(obj, path) {
    const parts = path.split(".");
    let current = obj;

    for (let i = 0; i < parts.length - 1; i++) {
        if (!current || typeof current !== "object") return;
        current = current[parts[i]];
    }

    if (current && typeof current === "object") {
        delete current[parts[parts.length - 1]];
    }
}

export function hasNullValues(obj) {
    return Object.values(obj).some(
        v => v === null || v === undefined
    );
}
