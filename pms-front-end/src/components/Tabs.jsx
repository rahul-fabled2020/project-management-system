import React from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';
import { connect } from 'react-redux';
import { setVisibilityFilter, visibilityFilters } from '../redux/actions/todoActions';

class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = (tab) => {
    const filter = tab==="Active"? visibilityFilters.SHOW_ACTIVE: tab==="Completed"? visibilityFilters.SHOW_COMPLETED: visibilityFilters.SHOW_ALL;
    this.props.onClick(filter);
    
    this.setState(() => ({ activeTab: tab }));
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className="tabs">
        <ul className="tabs__list">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab = {activeTab}
                key = {label}
                label={label}
                onClick = {onClickTabItem}
              />
            );
          })}
        </ul>
        <div className="tabs__content">
          {children.map((child)=>{
            if(child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filter: state.todos.visibility
})

const mapDispatchToProps = (dispatch) => ({
  onClick: (filter) => dispatch(setVisibilityFilter(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);