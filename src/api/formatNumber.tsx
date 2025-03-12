export function formatNumber(numberString: string): string {
    const number = Number(numberString)
    const numberArr = String(number.toFixed(2)).split('.');
    let p = numberArr[0];
    // eslint-disable-next-line no-unused-vars
    let i = 0, res = "", b = 3, c = 3, t = p.length, d = 0, sec = "";
    t--
    while (i < p.length) {
        i == b ? res = res + " " : i == i
        i == b ? b = b + 3 : i == i
        res = res + String(p[t])
        t--
        i++
    }
    let pp = res.length - 1
    while (d < res.length) {
        sec = sec + String(res[pp])
        pp--
        d++
    }

    return sec;
}
