/// <reference types="cypress"/>

const faker = require('faker');

const url = 'http://localhost:8081/api/v1/designer/template';
//random datas
const id = faker.random.uuid();
const name = faker.name.findName();



describe(('Tempelate Operations'),()=>{
    beforeEach(() =>{
        cy.login();
    })

    it('Should be able to get template', ()=>{
        cy.get('@cookies').then((cookies) =>{
            cy.request({
                method: 'GET',
                url: url,
                headers:{
                    'Content-Type': 'application/json',
                    Cookie: cookies
                }
    
            }).then((getResponse) =>{
                expect(getResponse.status).to.eq(200);
            })
        })
    })

    it('Should be able to add new template', ()=>{
        cy.get('@cookies').then((cookies) =>{
            cy.request({
                method: 'POST',
                url: url,
                headers:{
                    'Content-Type': 'application/json',
                    Cookie: cookies

                },
                body: {
                    id: id,
                    name: name,
                    noteIds: []
                }

            }).then((appResponse)=>{
                expect(appResponse.status).to.eq(200);
            })
        })
    })

    it('Should be able to get individual templats ids', ()=>{
        cy.get('@cookies').then((cookies) =>{
            cy.request({
                method: 'GET',
                url: `${url}/${id}`,
                headers:{
                    'Content-Type': 'application/json',
                    Cookie: cookies
                }
    
            }).then((getResponse) =>{
                expect(getResponse.status).to.eq(200);
            })
        })
    })



    it('Should be able to modify a note', () => {
        cy.get('@cookies').then((cookies) => {
          const updatedNoteData = {
            name: faker.name.findName(), // Generate a new random name
            
          };
      
          cy.request({
            method: 'PATCH',
            url: `${url}/${id}`,
            headers: {
              'Content-Type': 'application/json',
              Cookie: cookies
            },
            body: updatedNoteData
          }).then((updateResponse) => {
            expect(updateResponse.status).to.eq(200);
          })
        })
      })

      it('Should be able to delete a note', () => {
        cy.get('@cookies').then((cookies) => {
          cy.request({
            method: 'DELETE',
            url: `${url}/${id}`,
            headers: {
              'Content-Type': 'application/json',
              Cookie: cookies
            }
          }).then((appResponse) => {
            expect(appResponse.status).to.eq(200);
          })
        })
      })


})
