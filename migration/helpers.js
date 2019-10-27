exports.docsToData = (data) => {
    let hdData = data.map(d => ({...d}));
    hdData.forEach(d => {
        delete d._id;
        delete d.__v;
    })
    return hdData;
}

exports.docToData = d => {
    const data = {...d};
    delete data._id;
    delete data.__v;
    return data;
}
