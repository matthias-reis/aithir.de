import { Section } from '../comp/layout';
import { SectionHead, Text } from '../comp/typo';

export default function Page() {
  return (
    <>
      <Section>
        <SectionHead>Magazine</SectionHead>
        <Text>First Magazine</Text>
      </Section>
      <Section>
        <SectionHead>Featured Storylines</SectionHead>
        <Text>More Text</Text>
      </Section>
      <Section>
        <SectionHead>Previous Posts</SectionHead>
        <Text>More Text</Text>
      </Section>
    </>
  );
}
