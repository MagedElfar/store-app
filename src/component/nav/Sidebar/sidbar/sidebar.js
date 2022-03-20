import React , {Component} from 'react';
import Content from '../sidebar-title/sidebar-Content';
import style from './sidebar.module.css';

class SideBar extends Component{
    

    render(){
        return(
            <>
                <section className={`${style['sid-bar-container']}`}>
                    <aside className={`${style['side-bar']}`}>
                        <Content title={"search our website"} toggle={this.closSideBar} />
                    </aside>
                </section>
               
            </>
        )
    }

}

function mapStateToProps(state){
    return{
        toggelOpen: state
    }
}

export default SideBar