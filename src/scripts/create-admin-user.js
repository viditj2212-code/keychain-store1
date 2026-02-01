const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });
const supabase = require('../config/supabase');

async function createAdmin() {
  const email = 'admin@keychain.com';
  const password = 'admin123';
  const firstName = 'Admin';
  const lastName = 'User';

  console.log(`Checking if user ${email} exists...`);

  // 1. Check if user exists in Supabase Auth
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    console.error('Error listing users:', listError);
    process.exit(1);
  }

  let user = users.find(u => u.email === email);
  let userId;

  if (user) {
    console.log('User already exists in Auth. Updating password...');
    const { data, error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: password, user_metadata: { role: 'admin', first_name: firstName, last_name: lastName } }
    );

    if (updateError) {
      console.error('Error updating password:', updateError);
      process.exit(1);
    }
    userId = user.id;
    console.log('Password updated.');
  } else {
    console.log('User does not exist. Creating...');
    const { data, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role: 'admin', first_name: firstName, last_name: lastName }
    });

    if (createError) {
      console.error('Error creating user:', createError);
      process.exit(1);
    }
    userId = data.user.id;
    console.log('User created in Auth.');
  }

  // 2. Ensure user exists in public.users table with admin role
  console.log('Upserting user into public.users table...');
  const { error: upsertError } = await supabase
    .from('users')
    .upsert({
      id: userId,
      email,
      first_name: firstName,
      last_name: lastName,
      role: 'admin',
      updated_at: new Date()
    });

  if (upsertError) {
    console.error('Error upserting into public.users:', upsertError);
    process.exit(1);
  }

  console.log('Admin user successfully configured!');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
}

createAdmin().catch(console.error);
