import { Dashboard } from "../pages/Dashboard/Dashboard"
import { ListTicket } from "../pages/Manage/ListTicket/ListTicket"
import { CheckTicket } from "../pages/Manage/CheckTicket/CheckTicket"

const publicRoutes = [
    {
        path: '/listTicket',
        component: ListTicket
    },
    {
        path: '/check-ticket',
        component: CheckTicket
    },
]

export { publicRoutes }