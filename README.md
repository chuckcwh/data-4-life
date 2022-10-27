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

Here is the [dummy CSV](https://github.com/chuckcwh/data-4-life/blob/main/src/data/dummy.csv)

## Assumptions

- At CSV import, the first unique "doctor_id" / "patient_id" / "appointment_id" would be the source of truth. For example, if there are 2 entries with the same patient_id, the first one will be used as patient profile.

- When upload CSV (or click `USE DEFAULT CSV`) will refresh the data.

- Fix appointment detail in table directly.
