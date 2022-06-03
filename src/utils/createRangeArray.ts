const createRangeArray = (start, stop, step) => Array.from({ length: (stop - start) }, (_, i) => start + (i * step))

export default createRangeArray
