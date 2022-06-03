import React from 'react'

import Carousel from 'components/general/Carousel'
import { Button, Icon, Tag } from 'components/basic'

import { ITag } from 'components/searchResultList/filterInterfaces'

interface IPropTypes {
  tags: Array<ITag>,
  onSearchTagsChange: () => void,
  removeTags: (tags: Array<ITag>, tagId: string, handleSearchTags: () => void) => void
}

const TagCarousel = ({ tags, onSearchTagsChange, removeTags }: IPropTypes) => {
  return (
    <Carousel
      id="filterTagCarousel"
      className="_w-full"
      showArrows={false} >
      {
        tags.map(tag => {
          return (
            <Tag key={tag.id} id={tag.id} dismissible={true} className="filter-tag _mr-3 _pl-2 _pr-1 _py-1 _d-flex">
              <div className="_mr-2">{tag.name}</div>
              <div className="_d-flex _justify-content-end">
                <Button
                  key={`remove-${tag.id}`}
                  id={`remove-${tag.id}`}
                  className="tag-remove-button _bg-gray-200 _text-gray-500 _rounded-circle _border-0 _d-flex _align-items-center _justify-content-center _p-1 _m-0"
                  onClick={() => removeTags(tags, tag.id, onSearchTagsChange)}>
                  <Icon type="regular" iconName="times" />
                </Button>
              </div>
            </Tag>
          )
        })
      }
    </Carousel>
  )
}

export default TagCarousel
