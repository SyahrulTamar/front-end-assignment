import { gql } from '@apollo/client/core'

export const GET_ALL_LOCATIONS = gql`
  query GetAllLocations {
    locations {
      id
      name
      latitude
      longitude
    }
  }
`
