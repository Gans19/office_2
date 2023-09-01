import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./Home.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa6";
import { getMonth, getYear } from "date-fns";

// import { format } from "date-fns";

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <button
    type="button"
    className="example-custom-input"
    onClick={onClick}
    variant="outline-primary"
    ref={ref}
  >
    <p>{value}</p>
  </button>
));

const Home = () => {
  const date = new Date();

  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  const [startDate, setStartDate] = useState(date);
  const [selected, setSelected] = useState(startDate);
  const nextDay = new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000);
  const [endDate, setEndDate] = useState(nextDay);

  //   const maxDay = new Date(new Date(date).getTime() + 7 * 24 * 60 * 60 * 1000);
  //   console.log(maxDay);

  //   const max = maxDay
  //     .toLocaleDateString("en-GB", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "numeric",
  //     })
  //     .split("/")
  //     .reverse()
  //     .join("-");

  // Handle Change For the Input Field

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
      startdate: startDate,
      enddate: endDate,
    });
  };

  // Handle Submission Form for Data

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== "") {
      // Update the existing entry
      const updatedData = [...tableData];
      updatedData[editIndex] = {
        // ...updatedData[editIndex], // Spread the existing data
        ...inputs,
        // startdate: startDate,
        // enddate: endDate,
        startdate: editIndex !== "" ? startDate : inputs.startdate,
        enddate: editIndex !== "" ? endDate : inputs.enddate,
      };
      setTableData(updatedData);
      console.log(updatedData);

      //   Reset the input fields, date ranges, and edit state
      setInputs({
        name: "",
        category: "",
        value: "",
        startdate: startDate,
        enddate: endDate,
      });
      setStartDate(new Date());
      setEndDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
      setEditIndex("");
      setEditClick(false);
    } else {
      // Add a new entry
      setTableData([...tableData, inputs]);

      // Reset the input fields and date ranges

      setInputs({
        name: "",
        category: "",
        value: "",
        startdate: startDate,
        enddate: endDate,
      });
      setStartDate(new Date());
      console.log(startDate);
      setEndDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
      console.log(endDate);
      setEditClick(false);
      setEditIndex("");
    }
  };

  // Handle Edit Button

  const handleEdit = (index) => {
    const tempData = tableData[index];
    setEditIndex(index);
    console.log(index);
    setEditClick(true);
    console.log(tempData);
    setInputs({
      name: tempData.name.trim(),
      startdate: tempData.startdate,
      enddate: tempData.enddate,
      category: tempData.category,
      value: tempData.value,
    });

    // Convert start and end dates to Date objects
    const startDate = new Date(tempData.startdate);
    const endDate = new Date(tempData.enddate);
    setStartDate(startDate);
    setEndDate(endDate);
    setEditClick(true);
    setEditIndex(index);
  };

  const [inputs, setInputs] = useState({
    name: "",
    startdate: startDate,
    enddate: endDate,
    category: "",
    value: "",
  });

  // const years = Array.from(
  //   { length: getYear(new Date()) - 1999 },
  //   (_, index) => 2000 + index
  // );

  // This is for the day , month and year selection when the Date is updated

  const years = Array.from(
    { length: 2035 - 2023 + 1 },
    (_, index) => 2023 + index
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (!editClick) {
      // Update end date to be one day after the selected start date
      const nextDay = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
      setEndDate(nextDay);
    }
  }, [startDate]);
  // const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  // const [datePickerIsOpen2, setDatePickerIsOpen2] = useState(false);

  // const openDatePicker = () => {
  //   setDatePickerIsOpen(!datePickerIsOpen);
  // };
  // const openDatePicker2 = () => {
  //   setDatePickerIsOpen2(!datePickerIsOpen2);
  // };

  // const [value, setValue] = useState('');

  // const handleChange = (event) => {
  //   restrictInputFormat(event.target);
  //   setValue(event.target.value);
  // };

  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const [datePickerIsOpen2, setDatePickerIsOpen2] = useState(false);

  const handleIconClick = () => {
    setDatePickerIsOpen(true);
  };
  const handleIconClick2 = () => {
    setDatePickerIsOpen2(true);
  };

  const restrictInputFormat = (input) => {
    // input.value = input.value.replace(/[^\d\.]/g, ""); /[^\d\-+\.]/g
    input.value = input.value.replace(/[^\d\-+\.]/g, "");
    if (input.value.length > 5) {
      input.value = input.value.substr(0, 5);
    }
  };

  const onlyAllowNumbersAndDot = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 46) {
      event.preventDefault();
      return false;
    }
  };

  const startDatePickerRef = useRef(null);

  const validateKeyPress = (event) => {
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ".",
      "Backspace",
      "Delete",
    ];
    const keyPressed = event.key;

    if (!allowedKeys.includes(keyPressed)) {
      event.preventDefault();
    }

    const inputValue = event.target.value;
    const regex = /^\d{0,2}(\.\d{0,2})?$/;

    if (
      !regex.test(inputValue + keyPressed) &&
      keyPressed !== "Backspace" &&
      keyPressed !== "Delete" &&
      keyPressed !== "ArrowLeft"
    ) {
      event.preventDefault();
    }
  };

  return (
    // Container for the Page object

    <div className="min-h-screen container">
      {/* Booking Form Section Start */}

      <div className="card p-6">
        <h1 className="text-center">Booking Form</h1>
        <div className="max-w-fit m-auto p-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>

              <span>
                <input
                  id="name"
                  className="form-control"
                  name="name"
                  required="required"
                  value={inputs.name.replace(/\s+/g, " ").trim()}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Enter a Name"
                  // pattern="/^\S*$/"
                />
              </span>
            </div>

            <div className="flex flex-col">
              <label htmlFor="startDate">Start Date</label>
              {/* {`${format(startDate, "dd/MM/yyyy")}`} */}
              <span
                onChange={handleChange}
                className="datePick"
                onClick={handleIconClick}
              >
                <DatePicker
                  id="startDate"
                  name="startDate"
                  selected={startDate}
                  // shouldCloseOnSelect={startDate}
                  // startDate={startDate}
                  // onClick={!handleIconClick}
                  onChange={(date) => {
                    setSelected(date);
                    setStartDate(date);
                    setDatePickerIsOpen(false);
                  }}
                  customInput={<ExampleCustomInput />}
                  dateFormat="dd/MM/yyyy"
                  minDate={date}
                  showYearDropdown
                  showPopperArrow={true}
                  // open={datePickerIsOpen}
                  shouldCloseOnSelect={datePickerIsOpen}
                  onClickOutside={() => setDatePickerIsOpen(false)}
                  // onClickOutside={openDatePicker2}
                  // open={datePickerIsOpen2}
                  ref={startDatePickerRef}
                  onBlur={() => startDatePickerRef.current.setOpen(false)} // Close date picker on blur
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      style={{
                        margin: "5px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent form submission
                          increaseMonth();
                        }}
                        disabled={prevMonthButtonDisabled}
                        style={{
                          height: "30px",
                          width: "45px",
                          background: "transparent",
                          border: "none",
                          fontWeight: "bold",
                          color: "grey",
                          fontSize: "20px",
                        }}
                      >
                        {"◀️"}
                      </button>
                      <select
                        style={{
                          height: "30px",
                          width: "65px",
                          // -webkit-appearance: "none",
                          WebkitAppearance: "none",
                          textAlign: "center",
                          borderRadius: "2px",
                        }}
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                      >
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                          changeMonth(months.indexOf(value))
                        }
                        style={{
                          height: "30px",
                          width: "75px",
                          WebkitAppearance: "none",
                          textAlign: "center",
                          borderRadius: "2px",
                          marginLeft: "5px",
                        }}
                      >
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent form submission
                          increaseMonth();
                        }}
                        disabled={nextMonthButtonDisabled}
                        style={{
                          height: "30px",
                          width: "45px",
                          background: "transparent",
                          border: "none",
                          fontWeight: "bold",
                          color: "grey",
                          fontSize: "20px",
                        }}
                      >
                        {"▶️"}
                      </button>
                    </div>
                  )}
                />
                {/* <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showYearDropdown
                /> */}
                <div onClick={handleIconClick} className="calender-body">
                  <FaCalendar className="calender" />
                </div>
              </span>
            </div>

            <div className="flex flex-col">
              <label htmlFor="endDate">End Date</label>
              {/* {`${format(endDate, "dd/MM/yyyy")}`} */}
              <span onChange={handleChange} onClick={handleIconClick2}>
                <DatePicker
                  id="endDate"
                  name="endDate"
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                  }}
                  showPopperArrow={true}
                  customInput={<ExampleCustomInput />}
                  dateFormat="dd/MM/yyyy"
                  minDate={nextDay}
                  showYearDropdown
                  // open={datePickerIsOpen2}
                  shouldCloseOnSelect={datePickerIsOpen}
                  onClickOutside={() => setDatePickerIsOpen2(false)}
                  // onClickOutside={openDatePicker}
                  // open={datePickerIsOpen}
                  //   maxDate={maxDay}
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      style={{
                        margin: "5px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent form submission
                          decreaseMonth();
                        }}
                        disabled={prevMonthButtonDisabled}
                        style={{
                          height: "30px",
                          width: "45px",
                          background: "transparent",
                          border: "none",
                          fontWeight: "bold",
                          color: "grey",
                          fontSize: "20px",
                        }}
                      >
                        {"◀️"}
                      </button>
                      <select
                        style={{
                          height: "30px",
                          width: "65px",
                          // -webkit-appearance: "none",
                          WebkitAppearance: "none",
                          textAlign: "center",
                          borderRadius: "2px",
                        }}
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                      >
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                          changeMonth(months.indexOf(value))
                        }
                        style={{
                          height: "30px",
                          width: "75px",
                          WebkitAppearance: "none",
                          textAlign: "center",
                          borderRadius: "2px",
                          marginLeft: "5px",
                        }}
                      >
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          increaseMonth();
                        }}
                        disabled={nextMonthButtonDisabled}
                        style={{
                          height: "30px",
                          width: "45px",
                          background: "transparent",
                          border: "none",
                          fontWeight: "bold",
                          color: "grey",
                          fontSize: "20px",
                        }}
                      >
                        {"▶️"}
                      </button>
                    </div>
                  )}
                />
                <div onClick={handleIconClick2} className="calender-body">
                  <FaCalendar className="calender" />
                </div>
              </span>
            </div>

            <div className="flex flex-col">
              {/* Category Input Field Section Start */}

              <label htmlFor="category">Category</label>
              <span>
                <select
                  value={inputs.category}
                  onChange={handleChange}
                  name="category"
                  id="category"
                  className="select form-control"
                  required="required"
                  autoComplete="off"
                >
                  <option value="">~~~ Select Category ~~~</option>
                  <option value="Room 1">Room 1</option>
                  <option value="Room 2">Room 2</option>
                  <option value="Room 3">Room 3</option>
                  <option value="Room 4">Room 4</option>
                  <option value="Room 5">Room 5</option>
                </select>
              </span>
            </div>
            <div className="flex flex-col">
              {/* Value Input Field Section Start */}

              <label htmlFor="patternAttr">Value</label>
              <span>
                <input
                  onKeyDown={validateKeyPress}
                  type="text"
                  autoComplete="off"
                  name="value"
                  inputMode="decimal"
                  required="required"
                  id="patternAttr"
                  pattern="\d{2}(\.\d{2})?"
                  className="form-control"
                  value={inputs.value}
                  onChange={handleChange}
                  maxLength={5}
                  placeholder="Enter a value"
                  onInput={(e) => restrictInputFormat(e.target)}
                  onKeyPress={onlyAllowNumbersAndDot}
                />
              </span>
            </div>

            {/* Submit Button Section Start */}
            <span>
              <button type="submit" className="w-full text-white mt-3 editing">
                {editClick ? "Update" : "Booking Now"}
              </button>
            </span>
          </form>
        </div>
      </div>

      {/* Table Field Starts With  */}

      <div className="table">
        <Table className="w-full text-center" striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Category</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {tableData.map((item, i) => (
              <tr key={i}>
                <td>{item.name.trim()}</td>
                <td>
                  {/* Start Date Change to Another Format */}

                  {new Date(item.startdate)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .split("/")
                    .join("/")}
                </td>
                <td>
                  {/* End Date Change to Another Format */}

                  {new Date(item.enddate)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .split("/")
                    .join("/")}
                </td>
                <td>{item.category}</td>
                {/* Value Change to Another Format */}
                <td>{parseFloat(item.value).toFixed(2)}</td>
                <td>
                  {/* Handle Edit Button Section */}

                  <button
                    onClick={() => handleEdit(i)}
                    className="mr-3 text-yellow-300"
                  >
                    Edit
                  </button>
                  {/* <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
