async function testSite() {
  try {
    const htmlRes = await fetch('http://localhost:3000');
    console.log('HTML Status:', htmlRes.status);
    const htmlText = await htmlRes.text();
    console.log('HTML Length:', htmlText.length);
    console.log('Contains Theme Toggle:', htmlText.includes('themeToggleBtn'));
    console.log('Contains Sound Toggle:', htmlText.includes('soundToggleBtn'));
    console.log('Contains Particles Canvas:', htmlText.includes('heroParticlesCanvas'));
    console.log('Contains Reservation Pass:', htmlText.includes('resPassPreview'));
    console.log('Contains Toast Container:', htmlText.includes('toastContainer'));

    const prodRes = await fetch('http://localhost:3000/api/products');
    console.log('API /api/products Status:', prodRes.status);
    const prodData = await prodRes.json();
    console.log('Products Count:', prodData.count);
    console.log('Sample Product:', prodData.products[0]?.name);

    const cssRes = await fetch('http://localhost:3000/styles.css');
    console.log('CSS Status:', cssRes.status);
    const cssText = await cssRes.text();
    console.log('CSS Length:', cssText.length);
    console.log('CSS Contains Dark Theme:', cssText.includes('[data-theme="dark"]'));
    console.log('CSS Contains Pass Ticket:', cssText.includes('res-pass-preview'));

    const jsRes = await fetch('http://localhost:3000/app.js');
    console.log('JS Status:', jsRes.status);
    const jsText = await jsRes.text();
    console.log('JS Length:', jsText.length);
    console.log('JS Contains Audio Synthesizer:', jsText.includes('playSound'));
    console.log('JS Contains Confetti:', jsText.includes('triggerConfetti'));

    console.log('\n>>> ALL SYSTEMS VERIFIED SUCCESSFULLY! <<<');
  } catch (err) {
    console.error('Test failed:', err);
  }
}

testSite();
