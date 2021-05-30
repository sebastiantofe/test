# Test API

## Installation
1. Clone the repository
1. Create .env file and add "dbPASSWORD" and "dbPORT" variables in it.
1. Run 
```
npm install
```
1. To start run `npm run dev`

## Routes /api/v1

X = 'Admin role required'

### Sales /sales
* [X] Create sale POST /
* [X] Update sale PUT /:saleId X
* [X] Delete sale DELETE /:saleId X
* [X] Show sales GET /

### Products /products
* [X] Create product POST / X
* [X] Show products GET /

### Users /users
* [ ] Create user POST / X
* [X] Show users  GET / X
* [ ] Delete user  DELETE /:userId X
* [ ] Edit user role PUT /:userId X
* [ ] Create role POST /roles X

### Reports /reports
* [ ] Get daily report GET /daily X
* [ ] Get monthly report GET /monthly X

