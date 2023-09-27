/// <reference types="cypress"/>

const faker = require('faker');

//url
const url = 'http://localhost:3000/api/v1/designer/app';


//generating random fake data
const id = faker.random.uuid();
const subjectid = faker.random.uuid();
const moduleName = faker.random.word();
const updatedModuleName = faker.random.word();
const updatedSubjectId = faker.random.uuid();

describe("App Management", () => {
    beforeEach(() => {
      // Run the login command to obtain the cookies
      cy.login();
    });

    it("Should be able to get the designer app", () => {
        // Access the cookies using the alias
        cy.get('@cookies').then((cookies) => {
          // Perform the GET request using the obtained cookies
          cy.request({
            method: 'GET',
            url: url,
            headers: {
              'Content-Type': 'application/json',
              Cookie: cookies
            }
          }).then((getResponse) => {
            expect(getResponse.status).to.eq(200);
            // Additional assertions or actions with the response if needed
          });
        });
      });
  
    it("Should be able to add a new app", () => {
      // Access the cookies using the alias
      cy.get('@cookies').then((cookies) => {
        // Perform the request using the obtained cookies
        cy.request({
          method: 'POST',
          url: url,
          headers: {
            'Content-Type': 'application/json',
            Cookie: cookies
          },
          body: {
            name: moduleName,
            id: id,
            defaultUrl: moduleName,
            subjectId: subjectid,
            moduleIds: []
          }
        }).then((appResponse) => {
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
  
    it("Should be able to update an app", () => {
      // Access the cookies using the alias
      cy.get('@cookies').then((cookies) => {
        // Define the updated app data
        const updatedAppData = {
          name: updatedModuleName,
          id: id,
          defaultUrl: updatedModuleName,
          subjectId: updatedSubjectId,
          moduleIds: []
        };
  
        // Perform the PATCH request to update the app
        cy.request({
          method: 'PATCH',
          url: `${url}/${updatedAppData.id}`,
          headers: {
            'Content-Type': 'application/json',
            Cookie: cookies
          },
          body: updatedAppData
        }).then((updateResponse) => {
          expect(updateResponse.status).to.eq(200);
        });
      });
    });
  
    it("Should be able to delete an app", () => {
      // Access the cookies using the alias
      cy.get('@cookies').then((cookies) => {
        // Define the app ID
        const appId = id;
  
        // Perform the DELETE request to delete the app
        cy.request({
          method: 'DELETE',
          url: `${url}/${appId}`,
          headers: {
            'Content-Type': 'application/json',
            Cookie: cookies
          }
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(200);
        });
      });
    });
  
  });