export default function insertionSortLike<T>(
    array: T[],
    order: "asc" | "desc" = "asc",
    key?: string | undefined
): T[] | never {
    if (array.length === 0) return [];

    const isObjectArray = typeof array[0] === "object" && !Array.isArray(array[0]) && array[0] !== null;

    if (isObjectArray && !key)
        throw new Error("Informe a chave do objeto para realizar a ordenação.");

    if (!isObjectArray && typeof array[0] === "string")
        throw new Error("Esta função só suporta ordenação de valores numéricos. Verifique os dados.");

    let sorted: T[] = [];

    for (let i: number = 0; i < array.length; i++) {
        let isPlaced: boolean = false;
        const current: T = array[i];
        const value: number = isObjectArray && key ? array[i][key] : current;

        if (typeof value === "string") {
            throw new Error("Esta função só suporta ordenação de valores numéricos. Verifique os dados.");
        }

        for (let k: number = 0; k < sorted.length; k++) {
            const sortedValue: number = isObjectArray ? sorted[k][key] : sorted[k];
            if (order === "asc" ? value < sortedValue : value > sortedValue) {
                sorted.splice(k, 0, current);
                isPlaced = true;
                break;
            }
        }
        if (!isPlaced) {
            sorted.push(current);
        }
    }
    return sorted;
}
