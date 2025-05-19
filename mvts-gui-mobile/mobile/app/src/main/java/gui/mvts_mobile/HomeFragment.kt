package gui.mvts_mobile

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.cardview.widget.CardView
import gui.mvts_mobile.dto.singleton.AppDataSingleton
import org.w3c.dom.Text

class HomeFragment : Fragment() {
    val appData = AppDataSingleton.getInstance()


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_home, container, false)


        val user = view.findViewById<TextView>(R.id.txtUsername)
        user.text = appData.user!!.name
//        user.text = appData.user!!.name

        return view
    }

}