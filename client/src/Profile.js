import { useState, useEffect, useContext } from "react";
import { Context } from "./context/contextProvider";
import { Country, State, City } from "country-state-city";
import Avatar from "@mui/material/Avatar";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

const Profile = () => {
  const Input = styled("input")({
    display: "none",
  });

  const context = useContext(Context);
  const profileContext = context?.ProfileData;
  const { countries, states, cities, address, url } = profileContext?.state;
  // const [name, setName] = useState("");
  // const [countries, setCountries] = useState([]);
  // const [states, setStates] = useState({});
  // const [cities, setCities] = useState({});
  // const [address, setAddress] = useState([]);
  // const [url, setUrl] = useState(null);
  const [aline, setAline] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getCountries();
  }, []);

  function getCountries() {
    // setCountries(Country.getAllCountries());
    profileContext.dispatch({
      type: "set-countries",
      value: Country.getAllCountries(),
    });
  }

  function getStates(index) {
    let value = address[index].country.code;

    // setStates({...states,[index]:State.getStatesOfCountry(value)});
    profileContext.dispatch({
      type: "set-states",
      value: { ...states, [index]: State.getStatesOfCountry(value) },
    });
    console.log(states);
  }

  function getCities(index) {
    let value1 = address[index].country.code;
    let value2 = address[index].state;
    console.log(value1);
    console.log(value2);
    // setCities({...cities,[index]:City.getCitiesOfState(value1, value2)});
    profileContext.dispatch({
      type: "set-cities",
      value: { ...cities, [index]: City.getCitiesOfState(value1, value2) },
    });
  }

  // const [country, setCountry] = useState([]);

  const handlecountry = (event, ind) => {
    const value = event.target.value;
    console.log(ind);

    let arr = value.split(" ");
    let obj = {};

    obj.code = arr[0];
    obj.num = arr[1];

    const a = address;

    a[ind].address = aline;

    a[ind].country = obj;

    console.log(a);
    // setAddress([...a]);
    profileContext.dispatch({ type: "set-address", value: [...a] });

    getStates(ind);
  };

  const handlestate = (event, ind) => {
    const value = event.target.value;
    console.log(value);
    console.log(ind);

    const a = address;

    a[ind].state = value;

    console.log(a);
    // setAddress([...a]);
    profileContext.dispatch({ type: "set-address", value: [...a] });

    getCities(ind);
  };

  const handlecities = (event, ind) => {
    const value = event.target.value;
    console.log(value);
    console.log(ind);

    const a = address;

    a[ind].city = value;

    console.log(a);
    // setAddress([...a]);
    profileContext.dispatch({ type: "set-address", value: [...a] });
  };

  const handledefault = (ind) => {
    const a = address;

    a[ind].phone = phone;

    if (!a[ind].default) {
      a[ind].default = true;
    } else {
      a[ind].default = false;
    }

    // setAddress([...a]);
    profileContext.dispatch({ type: "set-address", value: [...a] });
  };

  const addItem = () => {
    const addressObj = {
      address: "",
      city: "",
      country: {},
      phone: "",
      state: "",
      default: false,
    };
    // setAddress([...address, addressObj]);
    profileContext.dispatch({
      type: "set-address",
      value: [...address, addressObj],
    });

    console.log(address);
  };

  const deleteAddress = (i) => {
    console.log(address);
    console.log(i);
    const p = address.filter((value, index) => index !== i);
    console.log(p);
    // setAddress([...p]);
    profileContext.dispatch({ type: "set-address", value: [...p] });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      const imageRef = ref(storage, "image");

      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              // setUrl(url);
              profileContext.dispatch({ type: "set-url", value: [url] });
            })
            .catch((error) => {
              console.log(error.message, "error getting the image url");
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div class="container-fluid">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-8">
              <form>
                <div class="form-group row mt-4">
                  <label for="Name" class="col-sm-2 col-form-label ">
                    Name
                  </label>
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      id="text"
                      name="name"
                      placeholder="Enter Name"
                      onChange={(e) =>
                        profileContext.dispatch({
                          type: "set-name",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div class="form-group row mt-4">
                  <label for="Password" class="col-sm-2 col-form-label">
                    Employee No.
                  </label>
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      id="empno"
                      name="empno"
                      placeholder="Enter Number"
                      onChange={(e) =>
                        profileContext.dispatch({
                          type: "set-empNo",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div class="mt-5 mb-5">
                  <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={addItem}
                  >
                    Address
                  </Button>
                  {address.map((i, ind) => {
                    return (
                      <div class="container card mt-4 ms-5">
                        <div class="card-body ">
                          <div class="text-end mb-3">
                            {address[ind].default ? (
                              <></>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  class="btn btn-light"
                                  onClick={() => deleteAddress(ind)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                    class="bi bi-trash"
                                    viewBox="0 0 16 16"
                                    style={{ color: "red" }}
                                  >
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path
                                      fill-rule="evenodd"
                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                    />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>
                          <div class="row">
                            <div class="col-6">
                              <div class="mt-2">
                                <label for="Address" class="me-2">
                                  Address
                                </label>
                                <input
                                  type="text"
                                  id="text"
                                  name="address"
                                  placeholder="Enter Address"
                                  class="pe-5 ps-5"
                                  onChange={(e) => setAline(e.target.value)}
                                />
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="mt-2">
                                <label for="City" class="me-2">
                                  City&nbsp;&nbsp;&nbsp;&nbsp;
                                </label>
                                <select
                                  name="city"
                                  class="custom-select  pt-1 pb-1"
                                  id="inlineFormCustomSelect"
                                  style={{ width: "295px" }}
                                  onChange={(e) => handlecities(e, ind)}
                                >
                                  <option>--Select City--</option>

                                  {ind in cities ? (
                                    <>
                                      {cities[ind].map((option, index) => (
                                        <option
                                          key={index}
                                          value={option.isoCode}
                                        >
                                          {option.name}
                                        </option>
                                      ))}
                                    </>
                                  ) : (
                                    <>{<p>No values</p>}</>
                                  )}
                                </select>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="mt-3">
                                <label for="Country" class="me-2">
                                  Country
                                </label>
                                <select
                                  name="country"
                                  class="custom-select  pt-1 pb-1"
                                  id="inlineFormCustomSelect"
                                  style={{ width: "295px" }}
                                  onChange={(e) => handlecountry(e, ind)}
                                >
                                  <option>--Select Country--</option>
                                  {countries.map((option, index) => (
                                    <option
                                      key={index}
                                      value={
                                        option.isoCode + " " + option.phonecode
                                      }
                                    >
                                      {option.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="mt-3">
                                <label for="Name" class="me-2">
                                  Phone
                                </label>
                                <input
                                  type="text"
                                  id="text"
                                  name="name"
                                  value={address[ind].country.num}
                                  style={{ width: "45px" }}
                                />
                                <input
                                  type="text"
                                  id="text"
                                  name="name"
                                  style={{ width: "250px" }}
                                  placeholder="Enter number"
                                  class="pe-5 ps-5"
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="mt-3 mb-2">
                                <label for="Name" class="me-2">
                                  State&nbsp;&nbsp;&nbsp;&nbsp;
                                </label>
                                <select
                                  name="state"
                                  class="custom-select  pt-1 pb-1"
                                  id="inlineFormCustomSelect"
                                  style={{ width: "295px" }}
                                  onChange={(e) => handlestate(e, ind)}
                                >
                                  <option>--Select State--</option>

                                  {ind in states ? (
                                    <>
                                      {states[ind].map((option, index) => (
                                        <option
                                          key={index}
                                          value={option.isoCode}
                                        >
                                          {option.name}
                                        </option>
                                      ))}
                                    </>
                                  ) : (
                                    <>{<p>No values</p>}</>
                                  )}
                                </select>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="mt-3 mb-2">
                                <label for="Name" class="me-2">
                                  Default
                                </label>
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="defaultCheck1"
                                  onChange={() => handledefault(ind)}
                                  disabled={address.default}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </form>
            </div>
            <div class="col-4 ">
              <Avatar src={url} sx={{ width: 140, height: 140 }} />
              <label ButtonFor="contained-button-file" class="mt-4 ms-4">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleImageChange}
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
