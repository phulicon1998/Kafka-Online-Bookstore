import React from "react";

const PersonalMenu = () => (
    <div>
    	<div className="user-box">
    		<div>
    			<i className="fas fa-user-circle"/>
    			<div>
    				<p>Phu Nguyen</p>
    				<small>Normal customer</small>
    			</div>
    		</div>
			<p>0 pts</p>
    	</div>
    	<div className="setting-list">
    		<div>
    			<p><i className="fas fa-user-edit"/> Account profile</p>
    		</div>
    		<div className="select">
    			<p><i className="fas fa-box-open"/> Manage orders</p>
    		</div>
    		<div>
    			<p><i className="fas fa-bell"/> Notification</p>
    			<i className="fas fa-exclamation"/>
    		</div>
    		<div>
    			<p><i className="fas fa-map-marker-alt"/> Address book</p>
    		</div>
    		<div>
    			<p><i className="far fa-eye"/> Book viewed</p>
    		</div>
    		<div>
    			<p><i className="fas fa-bible"/> My K-care <span>14</span></p>
    		</div>
    	</div>
    </div>
)

export default PersonalMenu;
