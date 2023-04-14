import GooglePay from "./GooglePay"
import { useState, useEffect, useContext } from "react";
import { Context } from "./context/contextProvider";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Progress from "./Progress.js" 


const axios = require("axios");

const BankDetails = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [accNo, setAccNo] = useState("");
  const [cnfrmNo, setCnfrmNo] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bank, setBank] = useState({});

  const context = useContext(Context);
  const profileContext = context?.ProfileData;
  const { name, empNo, countries, states, cities, address, url } =
    profileContext?.state;

  const getBankDetails = (code) => {
    if(code !="" && code.length==11)
    {
     setShow(true);
      axios
      .get("https://ifsc.razorpay.com/" + code)
      .then(function (response) {
        console.log(response);
        setBank(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
      toast.error("Please Enter Valid IFSC", { autoClose: 2500 });
    }
    
  };

  const handleSave = () => {
    console.log(accNo)
    console.log(cnfrmNo)
    if(name!="" && empNo!="" && accNo!="" && ifsc!="" && url!="" && address!="")
    {
      if( accNo.length>=9 && accNo.length<=18)
      {
        if(accNo == cnfrmNo)
        {
          axios
          .post("http://localhost:5000/create", {
            name: name,
            empNo: empNo,
            accNo: accNo,
            ifsc: ifsc,
            imgUrl: url,
            address: address,
          })
          .then(function (response) {
            toast.success(response.data.message, { autoClose: 2500 });
          })
          .catch(function (error) {
            console.log(error);
          });
    
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        }
        else{
          toast.error("Account number and ReEntered account number should be same", { autoClose: 2500 });
        }
      }
      else{
        toast.error("Error");
        
      }
      

    }
    else{
      toast.error("Please Enter all the field", { autoClose: 2500 });
    }
   
  };

  return (
    <div class="container-fluid">
      <ToastContainer />
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-8">
              <form>
                <div class="form-group row mt-4">
                  <label for="Acc No" class="col-sm-2 col-form-label ">
                    Acc No.
                  </label>
                  <div class="col-sm-6">
                    <input
                      type="number"
                      class="form-control"
                      id="input"
                      placeholder="Enter Account Number"
                      name="accNo"
                      onChange={(e) => setAccNo(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row mt-4">
                  <label for="ReEnter Acc" class="col-sm-2 col-form-label">
                    ReEnter Acc No.
                  </label>
                  <div class="col-sm-6">
                    <input
                      type="number"
                      class="form-control"
                      id="input"
                      placeholder="ReEnter Account Number"
                      name="reAcc"
                      onPaste={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      onCopy={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      onChange={(e) => setCnfrmNo(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row mt-4">
                  <label for="IFSC" class="col-sm-2 col-form-label">
                    IFSC
                  </label>
                  <div class="col-sm-3">
                    <input
                      type="text"
                      class="form-control"
                      name="ifsc"
                      placeholder="Enter IFSC Number"
                      value={ifsc}
                      onChange={(e) => setIfsc(e.target.value)}
                    />
                  </div>
                  <div class="col-sm-3">
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => getBankDetails(ifsc)}
                    >
                      Find Details
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div></div>
        <Progress />
        <GooglePay/>
        <div class="mt-5 mb-5 text-end me-5">
          <Button
            variant="contained"
            onClick={handleSave}
            endIcon={<SaveIcon />}
          >
            Save
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Bank Details</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  Bank
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    value={bank.BANK}
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  Branch
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    value={bank.BRANCH}
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  Contact
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    value={bank.CONTACT}
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  District
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    value={bank.DISTRICT}
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  State
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    value={bank.STATE}
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  Address
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    value={bank.ADDRESS}
                  />
                </div>
              </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BankDetails;
