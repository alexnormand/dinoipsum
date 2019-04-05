(function () {
  const form = document.getElementById('form');
  const results = document.getElementById('results');
  const details = document.querySelector('details');
  const defaultValues = {
    paragraphs: 10,
    words: 30,
    format: 'json',
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const filters = ([...new FormData(form).entries()])
      .reduce(
        (acc, [key, value]) => value ? { ...acc, [key]: value } : acc,
        defaultValues
      );

    const url = `/api?${(new URLSearchParams(filters))}`;
    const isJson = filters.output === 'json';
    const dinos = await fetch(url)
      .then(res => isJson ? res.json() : res.text())
      .then(res => isJson ? JSON.stringify(res, null, 4) : res);

    results.innerText = dinos;
    details.open = true;
  });
}());