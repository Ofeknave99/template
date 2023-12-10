import React, { useState } from 'react';
import customersData from '../customers.json'; 

const CustomersTable = () => {
  const [customers, setCustomers] = useState(customersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('');

  // פונקציה לסינון לקוחות לפי חיפוש
  const searchCustomers = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredCustomers = customersData.filter((customer) =>
      customer.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );
    setCustomers(filteredCustomers);
  };

  // פונקציה לסינון לקוחות לפי תוכנית
  const filterByPlan = (plan) => {
    setFilterPlan(plan);
    const filteredCustomers = customersData.filter((customer) =>
      plan === '' ? true : customer.plan === plan
    );
    setCustomers(filteredCustomers);
  };

  // פונקציה לייצוא ל-CSV
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      customers.map((customer) =>
        Object.values(customer).join(',')
      ).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'customers.csv');
    document.body.appendChild(link);
    link.click();
  };

  // פונקציה להוספת לקוח חדש
  const addCustomer = (e) => {
    e.preventDefault();
    const newCustomer = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      phone: e.target.phone.value,
      plan: e.target.plan.value
    };
    setCustomers([...customers, newCustomer]);
    e.target.reset();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="חיפוש לקוח..."
        value={searchTerm}
        onChange={(e) => searchCustomers(e.target.value)}
      />
      <select
        value={filterPlan}
        onChange={(e) => filterByPlan(e.target.value)}
      >
        <option value="">הכל</option>
        <option value="light">light</option>
        <option value="care">care</option>
        <option value="navigate">navigate</option>
      </select>
      <button onClick={exportToCSV}>ייצוא ל-CSV</button>
      {/* טופס להוספת לקוח חדש */}
      <form onSubmit={addCustomer}>
        <input type="text" name="firstname" placeholder="שם הלקוח" />
        <input type="text" name="lastname" placeholder="שם משפחה" />
        <input type="text" name="phone" placeholder="טלפון" />
        <select name="plan">
          <option value="">הכל</option>
          <option value="light">light</option>
          <option value="care">care</option>
          <option value="navigate">navigate</option>
        </select>
        <button type="submit">הוספת לקוח</button>
      </form>
      {/* טבלת הלקוחות */}
      <table>
        <thead>
          <tr>
            <th>שם</th>
            <th>שם משפחה</th>
            <th>טלפון</th>
            <th>תוכנית</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.firstname}</td>
              <td>{customer.lastname}</td>
              <td>{customer.phone}</td>
              <td>{customer.plan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;

