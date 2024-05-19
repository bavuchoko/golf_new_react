const toKSTISOString = (date) => {
    const kstOffset = 9 * 60 * 60 * 1000; // 한국 표준시는 UTC+9
    const kstTimestamp = date.getTime() + kstOffset;
    const kstDate = new Date(kstTimestamp);
    return kstDate.toISOString();
}

export {toKSTISOString};

