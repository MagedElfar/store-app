import React from 'react';
import MainBanner from './../../component/main-banner/main-baner'
import ProfileForm from '../../Forms/profile-form';
import SettingMenu from '../../component/nav/menu/setting-menu';

function Account(props){
    return(
            <section className="account-page">
                <MainBanner title={"Account"} />
                <div className="row mx-0">
                    <div className="order-2 order-md-1 setting-menu-side col-12 col-md-4 col-lg-3">
                        <SettingMenu />
                    </div>
                    <div className="order-1 order-md-2 setting-side col-12 col-md-8 col-lg-9">
                        <h2>Account:</h2>
                        <ProfileForm />
                    </div>

                </div>
            </section>
    )
}

export default Account;