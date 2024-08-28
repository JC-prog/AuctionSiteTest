import PlanCard from "../Components/Cards/PlanCard"

const AnalyticsPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">Subscription Tier</h2>
      
      <div className="flex justify-center mt-8 space-x-4">
        <PlanCard
          title="Basic User"
          price="$0"
          description="Access to standard features and functionalities of the platform."
          details="Limited number of listings"
          customerSupport="Basic Customer Support"
          buttonText="Thank You"
          buttonLink="#"
        />
        
        <PlanCard
          title="Premium User"
          price="$11.99/mo"
          description="All Features of Basic Membership"
          details="Unlimited number of listings"
          customerSupport="Priority Customer Support"
          buttonText="Get Premium"
          buttonLink="#"
        />
        
      </div>
    </div>
  )
}

export default AnalyticsPage