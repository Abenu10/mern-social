import Online from "../online/Online"
import "./rightbar.css"
import { Users } from "../../dummyData"

function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;

  const HomeRightbar = ()=>{
    return(
      <>
      <div className="birthdayContainer">
              <img src="assets/gift.png" className="birthdayImg" />
              <span className="birthdayText">
              <b>Pola Foster</b> and <b>3 other  friends</b> have a birthday today.
              </span>
            </div>
            <img src="assets/ad.png" className="rightbarAd" />
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
              {
                Users.map((u)=>(
                  <Online key={u.id} user={u}/>
                ))
              }
              
            </ul>
      </>
    )
  }
  const ProfileRightbar = ()=>{
    return(<>
      <h4 className="rightbar">User information</h4>
      <div className="rightbarInfo">
      <div className="rightbarInfoItem">
        <span className="rightbarInfokey">City : </span>
        <span className="rightbarInfoValue">{user.city}</span>
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfokey">From  : </span>
        <span className="rightbarInfoValue">{user.from}</span>
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfokey">Relationship : </span>
        <span className="rightbarInfoValue">{user.relationship===1 ? "Single" : user.relationship===2?"Married":"-"}</span>
      </div>
      </div>
      <h4 className="rightbar">User information</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
      <img src={`${PF}person/1.jpeg`} alt="" className="rightbarFollowingImg" />
      <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
      <img src={`${PF}person/2.jpeg`} alt="" className="rightbarFollowingImg" />
      <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
      <img src={`${PF}person/3.jpeg`} alt="" className="rightbarFollowingImg" />
      <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
      <img src={`${PF}person/4.jpeg`} alt="" className="rightbarFollowingImg" />
      <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
      <img src={`${PF}person/5.jpeg`} alt="" className="rightbarFollowingImg" />
      <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
      <img src={`${PF}person/6.jpeg`} alt="" className="rightbarFollowingImg" />
      <span className="rightbarFollowingName">John Carter</span>
        </div>
      </div>
    </>)
  }
     return (
    <div className="rightbar">
       
          <div className="rightbarWrapper">
            { user ? <ProfileRightbar /> : <HomeRightbar />}
            
          </div>
        </div>
  )
}

export default Rightbar