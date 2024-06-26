import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
 function About({user}) {
  const Navigate=useNavigate()
  return (
    <div className="bg-bgColor h-full flex justify-center">
    <Card className="h-full w-1/2 overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <tbody>
            <tr  className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    First Name
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {user?.firstName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography onClick={()=>Navigate('/ProfileEditing')} as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  Edit
                </Typography>
              </td>
            </tr>
            <tr  className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Last Name
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {user?.lastName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography onClick={()=>Navigate('/ProfileEditing')} as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  Edit
                </Typography>
              </td>
            </tr>
            <tr  className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography onClick={()=>Navigate('/ProfileEditing')} variant="small" color="blue-gray" className="font-normal">
                    Email
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {user?.email}
                </Typography>
              </td>
              <td className="p-4">
                <Typography onClick={()=>Navigate('/ProfileEditing')} as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  Edit
                </Typography>
              </td>
            </tr>
            <tr  className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography onClick={()=>Navigate('/ProfileEditing')} variant="small" color="blue-gray" className="font-normal">
                    Location
                </Typography>
              </td>
              <td className="p-4">
                <Typography onClick={()=>Navigate('/ProfileEditing')} variant="small" color="blue-gray" className="font-normal">
                    {user?.location?user.location:"NILL"}
                </Typography>
              </td>
              <td className="p-4">
                <Typography onClick={()=>Navigate('/ProfileEditing')} as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  Edit
                </Typography>
              </td>
            </tr>
            <tr  className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Profession
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {user?.profession?user.profession:"NILL"}
                </Typography>
              </td>
              <td className="p-4">
                <Typography onClick={()=>Navigate('/ProfileEditing')} as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  Edit
                </Typography>
              </td>
            </tr>
        </tbody>
      </table>
    </Card>
    </div>
  );
}
export default About