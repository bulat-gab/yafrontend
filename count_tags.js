var document = 

new Set(Array.from(document.all).reduce((acc, el) => {acc.push(el.tagName); return acc}, []))).size 