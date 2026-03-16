describe('Kontrola základních funkcí a vzhledu po aktualizaci backendu', () => {
  
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('https://www.knihydobrovsky.cz/', { timeout: 30000 });
    cy.get('body').then(($body) => {
      if ($body.find('.ch2-allow-all-btn').length > 0) {
        cy.get('.ch2-allow-all-btn').click({ force: true });
      }
    });
  });

  it('1. Ověření vyhledávání a vložení produktu do košíku', () => {
    const searchTerm = 'Zaklínač';

    cy.get('#search')
      .should('be.visible')
      .type(`${searchTerm}{enter}`);

    cy.get('.item', { timeout: 10000 })
      .first()
      .click({ force: true });

    cy.contains('Do košíku', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.contains('Pokračovat do košíku', { timeout: 15000 })
      .should('be.visible')
      .click({ force: true });

    cy.url().should('include', 'shopping-cart');
    cy.get('h1').should('be.visible').and('contain', 'Košík');
  });

  it('2. Ověření, že funguje hlavní menu a stránka se správně zobrazí', () => {
    cy.contains('a', 'Akce')
      .first()
      .click({ force: true });
    
    cy.url().should('include', '/akce');
    cy.get('h1').should('be.visible').and('not.be.empty');
  });

  it('3. Ověření chování při vyhledání neexistujícího produktu', () => {
    const nonsenseTerm = 'neexistujicikniha123';
    
    cy.get('#search')
      .should('be.visible')
      .type(`${nonsenseTerm}{enter}`);

    cy.url().should('include', 'vyhledavani');

    cy.contains('Zkontrolujte, zda jste napsali vše dobře').should('be.visible');
  });
});