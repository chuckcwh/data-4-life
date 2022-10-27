# Date4Life Code Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Scripts

In the project directory, please run:

```
npm i
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Assumptions

- At CSV import, the first unique "doctor_id" / "patient_id" / "appointment_id" would be the source of truth. For example, if there are 2 entries with the same patient_id, the first one would be used as patient details.
