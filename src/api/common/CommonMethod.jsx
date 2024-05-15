const toKSTISOString = (date) => {
    console.log(date)
    const kstOffset = 9 * 60 * 60 * 1000; // 한국 표준시는 UTC+9
    const kstTimestamp = date.getTime() + kstOffset;
    const kstDate = new Date(kstTimestamp);
    console.log(kstDate.toISOString())
    return kstDate.toISOString();
}

export {toKSTISOString};

