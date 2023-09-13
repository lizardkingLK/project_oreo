import React from 'react'
import UserNavbar from '../navs/user'
import MessageLinkList from '../lists/message/MessageLinkList'
import { ISidebarProps } from '@/types'

const SidebarSwitch = (props: ISidebarProps) => {
  const {
    className,
    navbar,
    setNavbar,
    setSection,
    newUser,
    groups,
    onSelectGroupHandler,
    group,
    active,
    userId,
  } = props
  if (navbar) {
    return (
      <div className={className}>
        <UserNavbar
          navbar={navbar}
          setNavbar={setNavbar}
          setSection={setSection}
          newUser={newUser}
        />
      </div>
    )
  } else {
    return (
      <div className={className}>
        <MessageLinkList
          groups={groups}
          setGroup={onSelectGroupHandler}
          selectedGroup={group}
          active={active}
          userId={userId}
        />
      </div>
    )
  }
}

export default SidebarSwitch
