export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-") // allow arabic words
        .replace(/-+/g, "-")                       // remove repeated ( - )
        .replace(/^-|-$/g, "");                    // يشيل الشرطات من البداية والنهاية
}
