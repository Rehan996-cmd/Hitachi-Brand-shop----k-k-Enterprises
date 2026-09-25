async function main() {
  try {
    const res = await fetch('http://localhost:3000');
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Includes Add to Plate:', text.includes('Add to Plate'));
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}
main();
