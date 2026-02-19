// Universal Size Guide Modal
// Usage: Add <span class="size-guide-link" data-guide="men|women|kids" onclick="openSizeGuide(event)">View Size Guide</span> to any page

const sizeGuides = {
  men: {
    title: "Men's Size Guide",
    table: `
      <table style="width:100%;border-collapse:collapse;font-size:1em;">
        <thead>
          <tr style="background:#bfe9ff;color:#111;">
            <th style="padding:0.5em 1.2em 0.5em 0.8em;text-align:left;border-bottom:1px solid #ccc;">Size</th>
            <th style="padding:0.5em 0.8em 0.5em 1.2em;text-align:left;border-bottom:1px solid #ccc;">Recommended Fit</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>XS</td><td>Petite/Youth</td></tr>
          <tr><td>S</td><td>Teens/Small Adults</td></tr>
          <tr><td>M</td><td>Average Adult</td></tr>
          <tr><td>L</td><td>Large Adult</td></tr>
          <tr><td>XL</td><td>Extra Large Adult</td></tr>
        </tbody>
      </table>
      <p style="margin-top:1.2rem;font-size:0.95em;color:#333;text-align:center;">For best fit, use recommended fit or contact us for measurements.</p>
    `
  },
  women: {
    title: "Women's Size Guide",
    table: `
      <table style="width:100%;border-collapse:collapse;font-size:1em;">
        <thead>
          <tr style="background:#bfe9ff;color:#111;">
            <th style="padding:0.5em 1.2em 0.5em 0.8em;text-align:left;border-bottom:1px solid #ccc;">Size</th>
            <th style="padding:0.5em 0.8em 0.5em 1.2em;text-align:left;border-bottom:1px solid #ccc;">Recommended Fit</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>XS</td><td>Petite/Youth</td></tr>
          <tr><td>S</td><td>Small Adult</td></tr>
          <tr><td>M</td><td>Average Adult</td></tr>
          <tr><td>L</td><td>Large Adult</td></tr>
          <tr><td>XL</td><td>Extra Large Adult</td></tr>
        </tbody>
      </table>
      <p style="margin-top:1.2rem;font-size:0.95em;color:#333;text-align:center;">For best fit, use recommended fit or contact us for measurements.</p>
    `
  },
  kids: {
    title: "Kids' Size Guide",
    table: `
      <table style="width:100%;border-collapse:collapse;font-size:1em;">
        <thead>
          <tr style="background:#bfe9ff;color:#111;">
            <th style="padding:0.5em 0.3em;border-bottom:1px solid #ccc;">Size</th>
            <th style="padding:0.5em 0.3em;border-bottom:1px solid #ccc;">Age</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>XS</td><td>4-5 years</td></tr>
          <tr><td>S</td><td>6-7 years</td></tr>
          <tr><td>M</td><td>8-9 years</td></tr>
          <tr><td>L</td><td>10-11 years</td></tr>
          <tr><td>XL</td><td>12-13 years</td></tr>
        </tbody>
      </table>
      <p style="margin-top:1.2rem;font-size:0.95em;color:#333;text-align:center;">For best fit, use age as a guide or contact us for measurements.</p>
    `
  }
};

function openSizeGuide(e) {
  e.preventDefault();
  const guideType = e.target.dataset.guide || 'men';
  const modal = document.getElementById('universalSizeGuideModal');
  modal.querySelector('.size-guide-title').innerHTML = sizeGuides[guideType].title;
  modal.querySelector('.size-guide-table').innerHTML = sizeGuides[guideType].table;
  modal.style.display = 'flex';
}
function closeSizeGuide() {
  document.getElementById('universalSizeGuideModal').style.display = 'none';
}
// Add modal to body if not present
if (!document.getElementById('universalSizeGuideModal')) {
  const modal = document.createElement('div');
  modal.id = 'universalSizeGuideModal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0,0,0,0.7)';
  modal.style.zIndex = '1000';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.innerHTML = `
    <div style="background:rgba(255,255,255,0.95);border-radius:12px;padding:2.5rem 2rem;max-width:420px;width:90vw;box-shadow:0 8px 32px rgba(0,0,0,0.18);color:#111;position:relative;">
      <button onclick="closeSizeGuide()" style="position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.5em;color:#111;cursor:pointer;">&times;</button>
      <h2 class="size-guide-title" style="font-family:'UnifrakturCook','Cinzel',serif;text-align:center;margin-bottom:1.2rem;color:#111;"></h2>
      <div class="size-guide-table"></div>
    </div>
  `;
  document.body.appendChild(modal);
}
