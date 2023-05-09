import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAdminLogout } from '../../hooks/useLogout'
import { useSelector } from 'react-redux'
import { IStore } from '../../interface/slice.interface'
import { useDispatch } from 'react-redux'
import { Iuser } from '../../interface/user.interface'
import { TbArrowsDownUp } from 'react-icons/tb'
import { CgArrowLongDown, CgArrowLongUp } from 'react-icons/cg'
import Button from '../UI/Button'
import TableService from '../UI/table/TableService'
import DataTable from "../UI/table/DataTable";
import { getAllUserDetailsApi, getSearchSortUserDetailsApi, updateUserStatusApi } from '../../api/user.api'
import { toastMessage } from '../../helpers/toast'


function ManageUsers() {
    
      const navigate = useNavigate()
    
      const location = useLocation()
    
      const logout = useAdminLogout()
    
      const [allUserDetails, setAllUserDetails] = useState<Iuser[]>()
      const adminToken = useSelector((state: IStore) => state.adminAuth.token)
      
      const [loading, setLoading] = useState(false)

    //   // fetching user information
      useEffect(() => {
        getAllUserDetailsApi(adminToken)
            .then(res => setAllUserDetails(res.data.data))
            .catch(err => {
                if(err.response.status === 401) logout()
                toastMessage('error', err?.response?.data?.message)})
      }, [])
      
      
      // changing the resort Status
      const handleDelete = (userId: string) => {
        setLoading(true)
        updateUserStatusApi(userId, adminToken)
            .then(res => setAllUserDetails(res.data.data))
            .catch(err => {
                console.log(err);
                if(err.response.status === 401) logout()
                toastMessage('error', err.response?.data?.message)})
            .finally(() => setLoading(false))
      }
    
    
    ///////////////////////////////////////////////// row data for table /////////////////////////////
    
      let renderData: any[] = [];
      if (allUserDetails) {
        allUserDetails.forEach((item, i) => {
          let singleUserDetail = {
            name: item.name,
            email: item.email,
            type: item.type,
            totalInvest: item.totalmoneySpent,
            joinedAt: new Date(item.createdAt).toDateString(),
            makeChanges: { _id: item._id, active: item.status, handleDelete},
          };
          renderData.push(singleUserDetail);
        });
      }
    
      ////////////////////////////// state for search and sort //////////////////////
    
      // search input
      const [searchInput, setSearchInput] = useState("");
      // sort order of the table data
      const [sortOrder, setSortOrder] = useState<"asc" | "des" | null>(null);
      // sort by header
      const [sortBy, setsortBy] = useState<string | null>(null);
    
      ///////////////////////////////////////changing the data according to the search input and sortby  API ///////////////////////////////
      // state which is given to the table after searching and sorting
      useEffect(() => {
        getSearchSortUserDetailsApi(adminToken, searchInput, sortBy, sortOrder)
            .then(res => setAllUserDetails(res.data.data))
            .catch(err => toastMessage('error', err?.response?.data?.message))
          // eslint-disable-next-line
      }, [searchInput, sortOrder, sortBy]);
    
      //////////////////////////////////////// defining the headers for my table data ///////////////////////////
    
      // will use this headers and change them into sortable buttons or labels according the to the table data
      const headers = ["Name", "Email", "Member Type", "Total investment", "Joined At", "Status"];

      
    
      /////////////////////////////////////////// sorting logic //////////////////////////////////////
    
      // i will call the API when there is a change in the state
      const handleHeaderClick = async (headingLabel: string) => {
        // logic for changing the sort arrows to asc when clicked a new header
        if (sortBy && headingLabel !== sortBy) {
          setsortBy(headingLabel);
          setSortOrder("asc");
          return;
        }
    
        // logic for changing the sort order to its next sort order
        if (sortOrder === null) {
          setSortOrder("asc");
          setsortBy(headingLabel);
        } else if (sortOrder === "asc") {
          setSortOrder("des");
          setsortBy(headingLabel);
        } else if (sortOrder === "des") {
          setSortOrder(null);
          setsortBy(null);
        }
      };
    
      // arrow icons
      const showSortIcons = (
        headingLabel: string,
        sortOrder: "asc" | "des" | null,
        sortBy: string | null
      ): JSX.Element => {
        // not showing the sorting arrows for non sortable table head
        if (headingLabel === "Image") {
          return <></>;
        } else if (headingLabel !== sortBy) {
          return <TbArrowsDownUp />;
        }
    
        //showing the correct arrows for the sort order value state
        if (sortOrder === "asc") {
          return <CgArrowLongUp />;
        } else if (sortOrder === "des") {
          return <CgArrowLongDown />;
        } else if (sortOrder === null) {
          return <TbArrowsDownUp />;
        } else {
          return <></>;
        }
      };
    
      // logic for showing the sort buttons for table head if sortable
      const headerDiv = headers.map((item) => {
          return (
            <Button
              key={item}
              class="flex mx-auto gap-3"
              onClick={handleHeaderClick}
              OnClickItem={item}
              color="black"
            >
              {item} {showSortIcons(item, sortOrder, sortBy)}
            </Button>
          );
      });
    
      //////////////////////////////////////////// search////////////////////////////////////
    
      let searchInputValue: string;
      const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchInputValue = e.target.value;
      };
      const handleClickSearch = () => {
        if (searchInputValue) setSearchInput(searchInputValue);
        if (searchInputValue === "") setSearchInput("");
      };
    
    
      return (
        <>
        <div className="mt-5 text-center">
          <h1 className="text-center mb-8 font-normal tracking-wide text-5xl">USERS</h1>
          <div className='md:w-[950px]'>
          {loading && (
        <div className="flex justify-center">
          <img
            width={50}
            src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
            alt=""
          />
        </div>
      )}
          <TableService
            inputOnchange={handleChangeSearch}
            buttonOnclick={handleClickSearch}
            // pages={gallaryDetails?.largeBanner.length!}
          />
          <DataTable rows={renderData} editImage={true} deleteButtonValue={true} headers={headerDiv} />
          </div>
        </div>
        </>
      );
    }
    

export default ManageUsers