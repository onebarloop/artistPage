describe('Titles are correct in...', () => {
  it('...homepage', () => {
    const page = cy.visit('/');
    page.get('title').should('have.text', 'alice_d.ied');
    page.get('strong').should('have.text', 'alice_d.ied');
  });

  it('...gallery', () => {
    cy.visit('/gallery').get('title').should('have.text', 'gallery');
  });
});

describe('Testing Links', () => {
  it('Link to gallery works', () => {
    cy.visit('/');
    const galleryLink = cy.get('header a[href="/gallery"]');
    galleryLink.click();
    cy.get('title').should('have.text', 'gallery');
  });
  it('Link to aboutpage works', () => {
    cy.visit('/');
    const aboutLink = cy.get('header a[href="/about"]');
    aboutLink.click();
    cy.get('title').should('have.text', 'about');
  });
});
