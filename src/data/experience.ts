export interface Job {
    company: string;
    location: string;
    role: string;
    start: string;
    end: string;
    points: string[];
}

export const experience: Job[] = [
    {
        company: "ATN Nail Supply",
        location: "Garden Grove, CA",
        role: "Website and E-commerce Operations Manager",
        start: "Jan 2026",
        end: "Aug 2026",
        points: [
            "Maintained inventory data, SKU mappings, and the Shopify catalog, and coordinated online order fulfillment.",
            "Prepared monthly sales and inventory reports and audited recurring application costs.",
            "Resolved website, checkout, application, and account-access issues with staff and vendors.",
        ],
    },
    {
        company: "Wing Hop Fung",
        location: "Monterey Park, CA",
        role: "Website Specialist",
        start: "Oct 2021",
        end: "Dec 2022",
        points: [
            "Worked with teams on inventory and fulfillment accuracy, and maintained Shopify product data, order records, and promotions.",
            "Monitored online performance with analytics dashboards and provided multilingual customer support.",
        ],
    },
    {
        company: "Amazon Flex",
        location: "California",
        role: "Delivery Driver",
        start: "Jan 2023",
        end: "Present",
        points: [
            "Complete last-mile delivery routes independently, the final step of the order-fulfillment chain.",
        ],
    },
    {
        company: "CNV Company",
        location: "Ho Chi Minh City",
        role: "Web Developer",
        start: "Jun 2017",
        end: "May 2019",
        points: [
            "Built websites and data-tracking features for service businesses, maintained them, and trained clients to use them.",
        ],
    },
];