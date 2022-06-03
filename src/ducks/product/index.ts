import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProductInformation, IProductDetails } from 'utils/interfaces/productInformation'

const initialState: {
    productInfo: IProductInformation,
    details: IProductDetails,
    productsUserIsAffiliated: Array<IProductInformation>,
  } = {
    productInfo: {
      affiliation: {
        commission: {
          percentage: 0,
          price: {
            currency: '',
            value: 0
          }
        }
      },
      producer: {
        name: '',
        ucode: ''
      },
      product: {
        alt: '',
        blueprint: 0,
        category: '',
        id: 0,
        image: '',
        isSubscription: false,
        locale: '',
        name: '',
        price: {
          currency: '',
          value: 0
        },
        reviewRating: 0,
        salesPage: '',
        tags: {
          affiliationRule: '',
          affiliationType: '',
          hasAffiliationResource: false,
          hasAlternativePage: false,
          hasHotleads: false
        },
        temperature: 0,
        totalAnswers: 0,
        ucode: '',
        bookmarked: false
      }
    },
    details: {
      userProfile: {
        name: '',
        signupYear: 0,
        tradeName: '',
        userBadges: [],
        urlPhoto: '',
        ucode: ''
      },
      productDetails: {
        alt: '',
        description: '',
        distributionForm: '',
        format: '',
        supportEmail: '',
        language: '',
        affiliatesProgramInformation: '',
        plans: [],
        blueprint: 0,
        blackNovember: {
          coupon: ''
        },
        checkoutLink: '',
        id: 0,
        image: '',
        isSubscription: false,
        name: '',
        offers: [],
        pageSalesLink: '',
        price: {
          currency: '',
          value: 0
        },
        reviewRating: 0,
        temperature: 0,
        ucode: '',
        bookmarked: false,
        tags: {
          affiliationCookieDuration: -1,
          affiliationRule: '',
          affiliationType: '',
          hasAffiliationResource: false,
          hasAlternativePage: false,
          hasHotleads: false
        }
      },
      affiliationDetails: {
        affiliationRequestAction: '',
        personType: '',
        userEligibleToBind: false,
        userIsOwner: false,
        commission: {
          percentage: 0,
          price: {
            currency: '',
            value: 0
          }
        }
      }
    },
    productsUserIsAffiliated: []
  }

const allotmentSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductInfo: (state, action: PayloadAction<IProductInformation>) => {
      state.productInfo = action.payload
    },
    setProductDetails: (state, action: PayloadAction<IProductDetails>) => {
      state.details = action.payload
    },
    setProductsUserIsAffiliated: (state, action: PayloadAction<Array<IProductInformation>>) => {
      state.productsUserIsAffiliated = action.payload
    }
  }
})

export const { setProductInfo, setProductDetails, setProductsUserIsAffiliated } = allotmentSlice.actions
export default allotmentSlice.reducer
