describe('CRUD de cliente', () => {
    it('Deve criar um cliente novo', () => {
        cy.visit('http://localhost:3000/')

        cy.get('#ButtonNewClient').click();
        cy.get('input[name="nome"]').type('Valdecir')
        cy.get('input[name="cpf"]').type('40700227830')
        cy.get('#ButtonSave').click();
        cy.get('#ButtonClose').click();

        cy.end()
    })
    it('Deve poder editar cliente', () => {
        cy.visit('http://localhost:3000/')

        cy.get('#ButtonEditar').click();
        cy.get('input[name="nome"]').type('Juracir')
        cy.get('input[name="cpf"]').type('40700227830')
        cy.get('#ButtonSave').click();

        cy.end()
    })
    it('Deve poder excluir cliente', () => {
        cy.visit('http://localhost:3000/')

        cy.get('#ButtonDelete').click();
        cy.get('#ButtonConfirmDelete').click();

        cy.end()
    })
})