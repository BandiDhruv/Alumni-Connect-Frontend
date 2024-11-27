import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
}

const mockJobs: Job[] = [
  { id: 1, title: "Software Developer", company: "Tech Co", location: "Mumbai", description: "We're looking for a talented software developer..." },
  { id: 2, title: "UX Designer", company: "Design Inc", location: "Bangalore", description: "Join our team as a UX designer and create amazing user experiences..." },
  { id: 3, title: "Data Analyst", company: "Data Corp", location: "Delhi", description: "We need a data analyst to help us make sense of our big data..." },
]

export function JobOpportunities() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [filters, setFilters] = useState({ location: '', industry: '' })

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value })
  }

  const filteredJobs = jobs.filter(job => 
    (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
    (!filters.industry || job.company.toLowerCase().includes(filters.industry.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Job Opportunities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            placeholder="Filter by location" 
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input 
            id="industry" 
            placeholder="Filter by industry" 
            value={filters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="college">College</Label>
          <Select onValueChange={(value) => handleFilterChange('college', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by college" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="iit">IIT</SelectItem>
              <SelectItem value="nit">NIT</SelectItem>
              <SelectItem value="bits">BITS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map(job => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>{job.company} - {job.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{job.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

