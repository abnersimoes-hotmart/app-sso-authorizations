import React from 'react'
import { ICrumb } from 'utils/interfaces/breadcrumb'
import { useHistory } from 'react-router-dom'

import './style.scss'

interface IPropTypes {
  breadcrumb: Array<ICrumb>
}

const Breadcrumb = ({ breadcrumb }: IPropTypes) => {
  const history = useHistory()

  const handleClickBreadcrumb = link => {
    history.push(link)
  }

  return (
    <hot-breadcrumb class="_bg-white">
      <div className="_m-4">
        {breadcrumb.map(crumb => {
          return (
            <hot-breadcrumb-item key={crumb.item} active={crumb.isActive}>
              {crumb.isActive ? (
                crumb.item
              ) : (
                <button className="breadcrumb-link" onClick={() => handleClickBreadcrumb(crumb.link)}>
                  {crumb.item}
                </button>
              )}
            </hot-breadcrumb-item>
          )
        })}
      </div>
    </hot-breadcrumb>
  )
}

export default Breadcrumb
