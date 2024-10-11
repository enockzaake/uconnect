import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleProfile } from "@/constants/sampleProfile";
import { StudentProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import DashboardHeader from "@/components/DashboardHeader";

import { getUserProfile } from "@/actions/admin";

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-sm font-medium text-primary">{label}</span>
      <span className="text-base font-semibold text-foreground">{value}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-bold text-primary mb-3">{children}</h3>;
}

export default async function ProfileReview({
  params,
}: {
  params: { id: string };
}) {
  const { data, error } = await getUserProfile(params.id);
  const profile: StudentProfile & any = data;

  if (!data) return <div className="">Profile not found</div>;
  return (
    <Card className="w-full mx-auto ">
      <DashboardHeader
        backButton={true}
        title={`Student Profile: ${profile.first_name} ${profile.last_name}`}
      />
      <CardHeader>
        <div className="">
          {profile.chosen_programs.map((program: any, index: number) => (
            <div key={index}>
              {index} {" : "}
              {program.programs.name}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className=" max-w-6xl">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[calc(100vh-12rem)] mt-6 pr-4">
            <TabsContent value="personal" className="space-y-8">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={profile.photo || "/placeholder.svg?height=96&width=96"}
                    alt={`${profile.first_name} ${profile.last_name}`}
                  />
                  <AvatarFallback>
                    {profile.first_name[0]}
                    {profile.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    {profile.title} {profile.first_name} {profile.last_name}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {profile.email}
                  </p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <InfoItem label="Mobile" value={profile.mobile} />
                <InfoItem label="Date of Birth" value={profile.dob} />
                <InfoItem label="Gender" value={profile.gender} />
                <InfoItem label="Nationality" value={profile.nationality} />
                <InfoItem
                  label="Country of Birth"
                  value={profile.country_of_birth}
                />
                <InfoItem label="Ethnicity" value={profile.ethnicity} />
              </div>
              <Separator className="my-6" />
              <div>
                <SectionTitle>Permanent Home Address</SectionTitle>
                <div className="space-y-2 text-base font-medium">
                  <p>{profile.permanent_home_address_line_1}</p>
                  <p>{profile.permanent_home_address_line_2}</p>
                  <p>{profile.permanent_home_address_line_3}</p>
                  <p>
                    {profile.permanent_home_address_postcode},{" "}
                    {profile.permanent_home_address_country}
                  </p>
                </div>
              </div>
              <div>
                <SectionTitle>Contact Address</SectionTitle>
                <div className="space-y-2 text-base font-medium">
                  <p>{profile.contact_address_line_1}</p>
                  <p>{profile.contact_address_line_2}</p>
                  <p>{profile.contact_address_line_3}</p>
                  <p>
                    {profile.contact_address_postcode},{" "}
                    {profile.contact_address_country}
                  </p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <InfoItem
                  label="Alternative Phone"
                  value={profile.alternative_phone_number}
                />
                <InfoItem
                  label="Disability/Special Needs"
                  value={profile.disability_or_special_needs}
                />
                <InfoItem
                  label="Parental Higher Education"
                  value={profile.parental_higher_education}
                />
                <InfoItem
                  label="Country of Permanent Residence"
                  value={profile.country_of_permanent_residence}
                />
              </div>
            </TabsContent>
            <TabsContent value="academic" className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <InfoItem label="Highest Level" value={profile.highest_level} />
                <InfoItem label="Status" value={profile.status} />
                <InfoItem
                  label="A Level Combination"
                  value={profile.a_level_combination}
                />
                <InfoItem
                  label="O Level Points"
                  value={profile.o_level_points}
                />
                <InfoItem
                  label="A Level Points"
                  value={profile.a_level_points}
                />
                <InfoItem label="Academic Year" value={profile.academic_year} />
                <InfoItem label="Intake" value={profile.intake} />
                <InfoItem
                  label="Tuition Fees Payer"
                  value={profile.tuition_fees_payer}
                />
              </div>
              <Separator className="my-6" />
              <div>
                <SectionTitle>Documents</SectionTitle>
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoItem label="PLE File" value={profile.ple_file} />
                  <InfoItem label="UCE File" value={profile.uce_file} />
                  <InfoItem label="UACE File" value={profile.uace_file} />
                  <InfoItem label="Other Documents" value={profile.documents} />
                </div>
              </div>
              <Separator className="my-6" />
              <div>
                <SectionTitle>Personal Statement</SectionTitle>
                <p className="text-base font-medium whitespace-pre-wrap">
                  {profile.personal_statement}
                </p>
              </div>
              <InfoItem
                label="Decision Influence"
                value={profile.decision_influence}
              />
            </TabsContent>
            <TabsContent value="employment" className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <InfoItem label="Job Title" value={profile.job_title} />
                <InfoItem label="Employed From" value={profile.employed_from} />
                <InfoItem label="Employed To" value={profile.employed_to} />
                <InfoItem label="Working Hours" value={profile.working_hours} />
                <InfoItem label="Employer Name" value={profile.employer_name} />
                <InfoItem
                  label="Employer Contact"
                  value={profile.employer_contact}
                />
              </div>
              <Separator className="my-6" />
              <div>
                <SectionTitle>Employer Address</SectionTitle>
                <p className="text-base font-medium whitespace-pre-wrap">
                  {profile.employer_address}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="references" className="space-y-8">
              <div>
                <SectionTitle>Referee 1</SectionTitle>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoItem label="Name" value={profile.referee_1_full_name} />
                  <InfoItem
                    label="Position"
                    value={profile.referee_1_position}
                  />
                  <InfoItem
                    label="Organisation"
                    value={profile.referee_1_organisation}
                  />
                  <InfoItem
                    label="Telephone"
                    value={profile.referee_1_telephone_number}
                  />
                  <InfoItem
                    label="Email"
                    value={profile.referee_1_email_address}
                  />
                  <InfoItem
                    label="Capacity Known"
                    value={profile.referee_1_capacity_known}
                  />
                </div>
                <div className="mt-4">
                  <InfoItem
                    label="Address"
                    value={`${profile.referee_1_address}, ${profile.referee_1_postcode}`}
                  />
                </div>
              </div>
              <Separator className="my-6" />
              <div>
                <SectionTitle>Referee 2</SectionTitle>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoItem label="Name" value={profile.referee_2_full_name} />
                  <InfoItem
                    label="Position"
                    value={profile.referee_2_position}
                  />
                  <InfoItem
                    label="Organisation"
                    value={profile.referee_2_organisation}
                  />
                  <InfoItem
                    label="Telephone"
                    value={profile.referee_2_telephone_number}
                  />
                  <InfoItem
                    label="Email"
                    value={profile.referee_2_email_address}
                  />
                  <InfoItem
                    label="Capacity Known"
                    value={profile.referee_2_capacity_known}
                  />
                </div>
                <div className="mt-4">
                  <InfoItem
                    label="Address"
                    value={`${profile.referee_2_address}, ${profile.referee_2_postcode}`}
                  />
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
}
