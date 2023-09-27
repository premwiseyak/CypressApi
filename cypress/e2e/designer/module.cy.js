/// <reference types="cypress"/>
const faker = require('faker');


const id = faker.random.uuid();
const moduleName = faker.random.word();
const updatedModuleName = faker.random.word();


describe('Module Management', ()=>{
    beforeEach(() => {
        
        cy.login();
    });
    it('Should be able to add ne module', ()=>{
        

        cy.get('@cookies').then((cookies)=>{

           

            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/designer/module',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookies
                },
                body: {
                    id: id,
                    name: moduleName,
                    templateIds: []
                }

            })
            .then((appResponse)=>{
                expect(appResponse.status).to.eq(200)
            })
        })
    })
    it('Should be able to update the module', () => {
       
        cy.get('@cookies').then((cookies) => {
        
          const updatedModuleData = {
            id: id,
            name: updatedModuleName,
            templateIds: []
          };
    
       
          cy.request({
            method: 'PATCH',
            url: `http://localhost:3000/api/v1/designer/module/${id}`,
            headers: {
              'Content-Type': 'application/json',
              Cookie: cookies,
            },
            body: updatedModuleData,
          }).then((updateResponse) => {
            expect(updateResponse.status).to.eq(200);
          })
        })
      })

    it('Should be able to delete the module', () => {
       
        cy.get('@cookies').then((cookies) => {
          
          cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/api/v1/designer/module/${id}`,
            headers: {
              'Content-Type': 'application/json',
              Cookie: cookies,
            },
          }).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(200);
          })
        })
      })
})