import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredUsers, fetchUsers } from './redux/actions/dataActions';
import UsersTable from './components/UsersTabel/UsersTable';
import MySelect from './components/MySelect/MySelect';
import MyInput from './components/MyInput/MyInput';
import './App.css';

const options = [
  { id: 'id', label: 'ID' },
  { id: 'firstName', label: 'Имя' },
  { id: 'lastName', label: 'Фамилия' },
  { id: 'maidenName', label: 'Отчество' },
  { id: 'age', label: 'Возраст' },
  { id: 'gender', label: 'Пол' },
  { id: 'phone', label: 'Телефон' },
  { id: 'address.city', label: 'Город' },
  { id: 'address.address', label: 'Адрес' },
];

function App() {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.users);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    fetchAllUsers();
  }, [dispatch]);

  const fetchAllUsers = () => {
    dispatch(fetchUsers({
      limit: 0,
      select: 'firstName,lastName,maidenName,age,gender,phone,email,address,height,weight'
    })).catch(() => console.error("Не удалось загрузить пользователей"));
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    fetchUsersWithFilter(selectedFilter, value);
  };

  const handleSelectedFilterChange = (event) => {
    const filterId = event.target.value;
    const selectedOption = options.find(option => option.id === filterId) || null;
    setSelectedFilter(selectedOption);
    fetchUsersWithFilter(selectedOption, filterValue);
  };

  const fetchUsersWithFilter = (filter, value) => {
    const queryParams = {
      limit: 0,
      select: 'firstName,lastName,maidenName,age,gender,phone,email,address,height,weight',
      ...(filter && value && {
        key: filter.id,
        value: value,
      }),
    };

    const fetchAction = filter && value ? fetchFilteredUsers : fetchUsers;
    dispatch(fetchAction(queryParams)).catch(() => console.error("Не удалось загрузить пользователей"));
  };

  return (
      <div className="App">
        <div className="container">
          <div className="filter-box">
            <MySelect
                options={options}
                value={selectedFilter ? selectedFilter.id : ''}
                onChange={handleSelectedFilterChange}
            />
            <MyInput
                value={filterValue}
                onChange={handleInputChange}
                disabled={!selectedFilter}
            />
          </div>
          <UsersTable users={users.users} />
        </div>
      </div>
  );
}

export default App;