describe('Kontrola základních funkcí a vzhledu po aktualizaci backendu', () => {

  beforeEach(() => {
    cy.viewport(1280, 800);

    cy.setCookie(
      'cookiehub', 
      'eyJhbnN3ZXJlZCI6dHJ1ZSwicmV2aXNpb24iOjEsImRudCI6ZmFsc2UsImFsbG93U2FsZSI6dHJ1ZSwiaW1wbGljdCI6ZmFsc2UsInJlZ2lvbiI6IiIsInRva2VuIjoiMDBoTnZXMnZkeTlQU0laTm9BV05QNUtUQVV3Y0JqR3FEV2Qwb0ljQVlQWmM3WkxycEttQ3Rzam1wRjdaUHRVSSIsInRpbWVzdGFtcCI6IjIwMjYtMDMtMTlUMTg6Mjk6NDEuMzE5WiIsImFsbEFsbG93ZWQiOnRydWUsImNhdGVnb3JpZXMiOltdLCJ2ZW5kb3JzIjpbXSwic2VydmljZXMiOltdLCJpbXBsaWNpdCI6ZmFsc2V9',
      { domain: '.knihydobrovsky.cz' }
    );

    cy.visit('https://www.knihydobrovsky.cz/');
  });


  describe('Vyhledávání', () => {
    
    it('1. Vyhledání existujícího produktu', () => {
      const searchTerm = 'Zaklínač';

      cy.get('#search')
        .should('be.visible')
        .type(`${searchTerm}{enter}`);

      cy.get('.title .name').should('have.length.greaterThan', 0);

      cy.get('.title .name').first().invoke('text').then((text) => {
        expect(text.toLowerCase()).to.contain('zaklínač');
      });
    });

    it('2. Vyhledání neexistujícího produktu', () => {
      const nonsenseTerm = 'neexistujicikniha123';
      
      cy.get('#search')
        .should('be.visible')
        .type(`${nonsenseTerm}{enter}`);

      cy.url().should('include', 'vyhledavani');

      cy.contains('Zkontrolujte, zda jste napsali vše dobře').should('be.visible');

      cy.get('.title .name').should('not.exist');
    });

    it('3. Našeptávač ve vyhledávání', () => {
      const partialTerm = 'Harry Pott';

      cy.get('#search')
        .should('be.visible')
        .type(partialTerm); 

      cy.get('.box-suggest').should('be.visible');

      cy.get('.box-suggest').contains('Harry Potter').should('be.visible');
    });
  });


  describe('Košík', () => {
    
    it('4. Vložení produktu do košíku z detailu knihy', () => {
      cy.get('#search').type('Duna{enter}');
      
      cy.get('.title .name')
        .first()
        .should('be.visible')
        .click();

      cy.contains('Do košíku')
        .should('be.visible')
        .click();

      cy.contains('Pokračovat do košíku', { timeout: 10000 })
        .click({ force: true });

      cy.url().should('include', 'shopping-cart');

      cy.get('h1').should('contain', 'Košík');
    });
    
    it('5. Odstranění produktu z košíku', () => {
      cy.get('#search').type('Havran{enter}');

      cy.get('.title .name').first().should('be.visible').click();

      cy.contains('Do košíku').should('be.visible').click();
      
      cy.contains('Pokračovat do košíku', { timeout: 10000 })
        .click({ force: true });
        
      cy.url().should('include', 'shopping-cart');

      cy.get('.remove-from-cart')
        .first()
        .click({ force: true }); 

      cy.contains('Váš košík je prázdný', { timeout: 10000 }).should('be.visible');
    });
  });

});