/// <reference types="cypress"/>

const faker = require('faker');

//url
const url = 'http://localhost:3000/api/v1/designer/note';

//random data
const id = faker.random.uuid();
const name = faker.name.findName();
const noteType = faker.name.findName();



describe("Note Operations", ()=>{
    beforeEach(()=>{
        cy.login();
    })

    it('Should be able to get notes', ()=>{
        cy.get('@cookies').then((cookies) => {
            
            cy.request({
              method: 'GET',
              url: url,
              headers: {
                'Content-Type': 'application/json',
                Cookie: cookies
              }
            }).then((getResponse) => {
              expect(getResponse.status).to.eq(200);
              
            });
          });
    })

    it('Should be able to create note', ()=>{
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
                    noteType: noteType,
                    fields: []
                }

            }).then((appResponse)=>{
                expect(appResponse.status).to.eq(200);
            })
        })
    })

    it('Should be able to get individual note ids', ()=>{
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
            fields: []
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
          });
        });
      });
      
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
